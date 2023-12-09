# создаем ВМ
resource "xenorchestra_vm" "vm" {
  memory_max = 8589934592 # RAM
  cpus = 4 # CPU
  name_label = "srv-063-miron-terraform-test" # VM name
  template = "c784ab57-88b7-7929-4e04-c820b5daa19c" # id шаблона который получили из info-id

  network {
    network_id = "0f1c060f-034b-94d5-a511-b896a3006c2e" # id сети который получили из info-id
  }

  disk {
    sr_id = "d2f13bf2-26b8-196f-007e-96153a67b694" # id сторейджа который получили из info-id
    name_label = "VM root volume"
    size = 100931731456
  }

}
