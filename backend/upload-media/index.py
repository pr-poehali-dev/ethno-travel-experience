"""
Загрузка пользовательских фото и видео к точкам маршрутов.
Принимает файл в base64, сохраняет в S3, возвращает публичный URL.
"""
import json
import os
import base64
import uuid
import boto3


ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime"}
MAX_IMAGE_SIZE = 15 * 1024 * 1024   # 15 MB
MAX_VIDEO_SIZE = 150 * 1024 * 1024  # 150 MB

EXTENSIONS = {
    "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
    "image/gif": "gif", "video/mp4": "mp4", "video/webm": "webm",
    "video/quicktime": "mov",
}


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        file_data = body.get("file")        # base64 строка
        mime_type = body.get("mimeType")    # "image/jpeg" и т.п.
        point_id  = body.get("pointId", "general")  # id точки маршрута

        if not file_data or not mime_type:
            return {"statusCode": 400, "headers": cors,
                    "body": json.dumps({"error": "Нужны поля file и mimeType"})}

        allowed = ALLOWED_IMAGE_TYPES | ALLOWED_VIDEO_TYPES
        if mime_type not in allowed:
            return {"statusCode": 400, "headers": cors,
                    "body": json.dumps({"error": f"Недопустимый тип файла: {mime_type}"})}

        # Декодируем base64
        if "," in file_data:
            file_data = file_data.split(",", 1)[1]
        file_bytes = base64.b64decode(file_data)

        max_size = MAX_VIDEO_SIZE if mime_type in ALLOWED_VIDEO_TYPES else MAX_IMAGE_SIZE
        if len(file_bytes) > max_size:
            mb = max_size // (1024 * 1024)
            return {"statusCode": 400, "headers": cors,
                    "body": json.dumps({"error": f"Файл слишком большой (макс. {mb} МБ)"})}

        ext = EXTENSIONS[mime_type]
        media_type = "videos" if mime_type in ALLOWED_VIDEO_TYPES else "photos"
        key = f"user-media/{point_id}/{media_type}/{uuid.uuid4()}.{ext}"

        s3 = get_s3()
        s3.put_object(
            Bucket="files",
            Key=key,
            Body=file_bytes,
            ContentType=mime_type,
        )

        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({
                "url": cdn_url,
                "type": media_type[:-1],  # "photo" или "video"
                "pointId": point_id,
            }),
        }

    except Exception as e:
        return {"statusCode": 500, "headers": cors,
                "body": json.dumps({"error": str(e)})}
