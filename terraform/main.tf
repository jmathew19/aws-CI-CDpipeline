resource "aws_instance" "example" {
  # Use the instance ID of the existing EC2 instance
  instance_id = "i-1234567890abcdef0"

  # Other attributes remain the same
  ami           = "ami-0e731c8a588258d0d" 
  instance_type = "t2.micro"
  key_name      = "terraform-key-pairs"
  vpc_security_group_ids = ["sg-0d6473f814374a9a6"]
  tags = {
    Name = "react proj"
  }

  # Lifecycle configuration to prevent recreating the instance
  lifecycle {
    prevent_destroy = true
  }

  # Provisioner block for updating software
  provisioner "remote-exec" {
    inline = [
      # Update software or configurations here
    ]
    
    # Connection details remain the same
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
