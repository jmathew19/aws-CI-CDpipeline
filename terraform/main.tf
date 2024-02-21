provider "aws" {
  region = "us-east-1"  # Specify your desired AWS region
}

resource "aws_instance" "example" {
  ami           = "ami-0e731c8a588258d0d" 
  instance_type = "t2.micro"
  key_name      = "terraform-key-pairs"
  #security_groups = ["sg-0d6473f814374a9a6"]
  vpc_security_group_ids =  ["sg-0d6473f814374a9a6"]
tags = {
    Name = "react proj"
}
provisioner "remote-exec" {
    inline = [

      "sudo yum update -y",
      "mkdir project",
      "cd project",
      "sudo yum install git -y",
      "git clone https://github.com/jmathew19/react-aws-terraform-project.git",
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
      private_key = file("~/Documents/AWS/terraform-key-pairs.pem")
      host        = self.public_ip
    }
}

}
