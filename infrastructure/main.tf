terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

variable "environment" {
  default = "production"
}

variable "app_name" {
  default = "greentech"
}

locals {
  instance_size     = "m5.large"
  instance_tenancy  = "dedicated"
  disk_type         = "io2"
  disk_size_gb      = 500
  disk_iops         = 16000
  db_class          = "db.r5.2xlarge"
  db_storage_gb     = 10000
  db_max_storage_gb = 100000
  db_iops           = 64000
  db_backup_days    = 35
  search_size       = "m5.large.search"
  search_nodes      = 3
  search_volume_gb  = 1000
  search_iops       = 16000
  log_retention     = 0
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "eu-central-1a"
}

resource "aws_subnet" "public_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-central-1b"
}

resource "aws_subnet" "public_c" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "eu-central-1c"
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "eu-central-1a"
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "eu-central-1b"
}

resource "aws_subnet" "private_c" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "eu-central-1c"
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_eip" "nat_a" { domain = "vpc" }
resource "aws_eip" "nat_b" { domain = "vpc" }
resource "aws_eip" "nat_c" { domain = "vpc" }

resource "aws_nat_gateway" "nat_a" {
  allocation_id = aws_eip.nat_a.id
  subnet_id     = aws_subnet.public_a.id
}

resource "aws_nat_gateway" "nat_b" {
  allocation_id = aws_eip.nat_b.id
  subnet_id     = aws_subnet.public_b.id
}

resource "aws_nat_gateway" "nat_c" {
  allocation_id = aws_eip.nat_c.id
  subnet_id     = aws_subnet.public_c.id
}

resource "aws_instance" "backend" {
  ami           = "ami-0faab6bdbac9486fb"
  instance_type = local.instance_size
  tenancy       = local.instance_tenancy
  subnet_id     = aws_subnet.private_a.id

  root_block_device {
    volume_type = local.disk_type
    volume_size = local.disk_size_gb
    iops        = local.disk_iops
  }

  tags = {
    Name        = "${var.app_name}-backend"
    Environment = var.environment
  }
}

resource "aws_instance" "frontend" {
  ami           = "ami-0faab6bdbac9486fb"
  instance_type = local.instance_size
  tenancy       = local.instance_tenancy
  subnet_id     = aws_subnet.private_b.id

  root_block_device {
    volume_type = local.disk_type
    volume_size = local.disk_size_gb
    iops        = local.disk_iops
  }

  tags = {
    Name        = "${var.app_name}-frontend"
    Environment = var.environment
  }
}

resource "aws_lb" "public" {
  name               = "${var.app_name}-public-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id, aws_subnet.public_c.id]
}

resource "aws_lb" "internal_backend" {
  name               = "${var.app_name}-backend-alb"
  internal           = true
  load_balancer_type = "application"
  subnets            = [aws_subnet.private_a.id, aws_subnet.private_b.id, aws_subnet.private_c.id]
}

resource "aws_lb" "internal_api" {
  name               = "${var.app_name}-api-alb"
  internal           = true
  load_balancer_type = "application"
  subnets            = [aws_subnet.private_a.id, aws_subnet.private_b.id, aws_subnet.private_c.id]
}

resource "aws_db_instance" "main" {
  identifier        = "${var.app_name}-db"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = local.db_class

  allocated_storage     = local.db_storage_gb
  max_allocated_storage = local.db_max_storage_gb
  storage_type          = local.disk_type
  iops                  = local.db_iops

  multi_az                = true
  backup_retention_period = local.db_backup_days
  skip_final_snapshot     = false

  db_name  = "greentech"
  username = "admin"
  password = "change-me"

  tags = {
    Environment = var.environment
  }
}

resource "aws_opensearch_domain" "search" {
  domain_name    = "${var.app_name}-search"
  engine_version = "OpenSearch_2.11"

  cluster_config {
    instance_type  = local.search_size
    instance_count = local.search_nodes
  }

  ebs_options {
    ebs_enabled = true
    volume_type = local.disk_type
    volume_size = local.search_volume_gb
    iops        = local.search_iops
  }

  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket" "assets" {
  bucket = "${var.app_name}-assets"
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/greentech/backend"
  retention_in_days = local.log_retention
}

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/greentech/frontend"
  retention_in_days = local.log_retention
}
