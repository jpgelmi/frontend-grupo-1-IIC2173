variable "bucket_name" {
  description = "The bucket name where the static website will be hosted."
  type        = string
}

variable "domain" {
  description = "The website's domain name."
  type        = string
}

variable "default_document" {
  description = "The web app's default document to be served."
  type        = string
  default     = "index.html"
}

variable "error_document" {
  description = "The web app's default error document."
  type        = string
  default     = "index.html"
}