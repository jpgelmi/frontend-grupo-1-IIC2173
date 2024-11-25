terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "website" {
  source = "./modules/static_website"
  bucket_name            = var.group_bucket_name
  domain                 = var.domain_name
}