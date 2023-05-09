window.onload = () => {
  if (window.location.host.indexOf("localhost") > -1) {
    window.appConfig.axios.baseURL = "http://192.168.1.10/v1"
    window.appConfig.appTitle = "http://192.168.1.10/v1"
  }
}
