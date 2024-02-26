provider "aws" {
  region = "us-east-1"  # Specify your desired AWS region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key# Add your AWS access and secret keys here or use other methods for authentication
}

# Data source to fetch information about the existing EC2 instance
data "aws_instance" "existing_instance" {
  instance_id = "i-07cecf6d8d622b781"  # Replace with the ID of your existing EC2 instance
}

# Null resource with provisioner to SSH into the existing instance and add a file
resource "null_resource" "add_file_to_instance" {
  triggers = {
    instance_id = data.aws_instance.existing_instance.id
  }

  # Provisioner to execute commands on the existing instance
  provisioner "remote-exec" {
    inline = [
      "mkdir testing123"
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"  # User to SSH into the instance
      private_key = base64decode(var.private_key_base64)  # Path to your private key file
      host        = data.aws_instance.existing_instance.public_ip  # Public IP of the instance
    }
  }
}


variable "private_key_base64" {
  description = "Base64 encoded private key content"
  type        = string
}

variable "aws_access_key_id" {
  description = "AWS access key ID"
  type        = string
}

variable "aws_secret_access_key" {
  description = "AWS secret access key"
  type        = string
}
