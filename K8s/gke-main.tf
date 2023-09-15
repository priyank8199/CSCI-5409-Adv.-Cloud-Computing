provider "google" {
  project = "infra-filament-387916"
  region  = "us-central1"
}

provider "kubernetes" {
  load_config_file = false
  host             = google_container_cluster.my_cluster.endpoint
  cluster_ca_certificate = base64decode(google_container_cluster.my_cluster.master_auth.0.cluster_ca_certificate)
  token = data.google_client_config.default.access_token
}

resource "google_container_cluster" "my_cluster" {
  name               = "k8s-assignment"
  location           = "us-central1-a"
  initial_node_count = 1

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring"
    ]
  }
}
