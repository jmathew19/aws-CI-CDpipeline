provider "aws" {
  region     = "us-east-1"  # Specify your desired AWS region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

# Define the EC2 instance resource
resource "aws_instance" "example" {
  ami                    = "ami-0e731c8a588258d0d"  # Specify your desired AMI
  instance_type          = "t2.micro"               # Initial instance type
  key_name               = "terraform-key-pairs"
  vpc_security_group_ids = ["sg-0d6473f814374a9a6"]  # Initial security group(s)
  tags = {
    Name = "react proj"
  }
}

# Null resource to trigger the provisioner for modifying files inside the EC2 instance
resource "null_resource" "modify_files" {
  triggers = {
    instance_id = aws_instance.example.id  # Trigger whenever the instance ID changes
  }

  # Provisioner to execute commands on the instance after it's created or updated
  provisioner "remote-exec" {
    inline = [
      "echo 'Hello, world!' > /tmp/test.txt",  # Example command to create a file
      "echo 'This is a test' >> /tmp/test.txt" # Example command to append to a file
      # You can add more commands here to modify files as needed
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"  # User to SSH into the instance
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