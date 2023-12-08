# получаем инфу о пуле
data "xenorchestra_pool" "pool" {
  name_label = "Sportivnaya"
}
# получаем инфу о шаблоне
data "xenorchestra_template" "vm_template" {
  name_label = "terraform-template"
}
# получаем инфу о хранилище в котором будет храниться ВМ
data "xenorchestra_sr" "sr" {
  name_label = "node02_raid1_SAS_4Tb"
  pool_id = data.xenorchestra_pool.pool.id
}
# получаем инфу о сети
data "xenorchestra_network" "network" {
  name_label = "111_DMZ"
  pool_id = data.xenorchestra_pool.pool.id
}
