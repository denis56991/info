# Пробую разобраться с terraform

для обхода блокировки использую зеркало hashicorp от Яндекса:

'nano ~/.terraformrc'

'''tf
provider_installation {
  network_mirror {
    url = "https://terraform-mirror.yandexcloud.net/"
    include = ["registry.terraform.io/*/*"]
  }
  direct {
    exclude = ["registry.terraform.io/*/*"]
  }
}
'''