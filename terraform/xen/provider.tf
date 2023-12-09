terraform {
 required_providers {
 xenorchestra = {
 source = "terra-farm/xenorchestra"
 }
 }
}


provider "xenorchestra" {

 url = "ws://ip or domain name"
 username = "login"
 password = "password"

}
