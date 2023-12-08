terraform {
 required_providers {
 xenorchestra = {
 source = "terra-farm/xenorchestra"
 }
 }
}

provider "xenorchestra" {

 url = "ws://10.2.80.100"
 username = "terraf"
 password = "Belk@Jj0t!"

}
