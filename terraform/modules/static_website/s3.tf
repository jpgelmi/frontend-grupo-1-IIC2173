resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "website_bucket_config" {
  bucket = aws_s3_bucket.website_bucket.bucket

  index_document {
    suffix = var.default_document
  }

  error_document {
    key = var.error_document
  }
}

resource "aws_s3_bucket_public_access_block" "website_bucket_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "website_bucket_policy_document" {
  statement {
    principals {
      type = "*"
      identifiers = ["*"]
    }
    actions = ["s3:GetObject"]
    effect  = "Allow"
    resources = [
      "${aws_s3_bucket.website_bucket.arn}/*"
    ]
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = data.aws_iam_policy_document.website_bucket_policy_document.json
}