# создаем ВМ
resource "xenorchestra_vm" "vm" {
  memory_max = 8589934592 # RAM
  cpus = 4 # CPU
  name_label = "srv-063-terraform-test-vm" # VM name
  template = "ebb70f65-0909-1c10-563e-05033f8a8066" # id шаблона который получили из info-id

  network {
    network_id = "0f1c060f-034b-94d5-a511-b896a3006c2e" # id сети который получили из info-id
  }

  disk {
    sr_id = "d2f13bf2-26b8-196f-007e-96153a67b694" # id сторейджа который получили из info-id
    name_label = "VM root volume"
    size = 53687091200
  }
}
