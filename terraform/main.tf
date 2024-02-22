provider "aws" {
  region     = "us-east-1"  # Specify your desired AWS region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

resource "aws_instance" "example" {
  ami           = "ami-0e731c8a588258d0d" 
  instance_type = "t2.micro"
  key_name      = "terraform-key-pairs"
  vpc_security_group_ids = ["sg-0d6473f814374a9a6"]
  tags = {
    Name = "react proj"
  }

  # No count parameter, so only one instance will be managed by Terraform

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "mkdir project",
      "cd project",
      "sudo yum install git -y",
      "git clone https://github.com/jmathew19/test.git",
      "cd react-aws-terraform-project",
      "sudo yum install -y nodejs npm",
      "node --version",
      "npm --version",
      "npm install react-scripts --save-dev",
      "npm install react-dom",
      # Additional commands to start your application
    ]
    
    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = base64decode(var.private_key_base64)
      host        = self.public_ip
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
