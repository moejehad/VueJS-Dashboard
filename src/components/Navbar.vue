<template>
        <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <h6 class="font-weight-bolder mb-0"> {{ title }} </h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 px-0" id="navbar">
        <ul class="navbar-nav me-auto ms-0 justify-content-end">
          <router-link tag="li" to="/search" class="nav-item px-3 d-flex align-items-center">
              <a class="nav-link text-body p-0">
                <i class="fa fa-search fixed-plugin-button-nav cursor-pointer" aria-hidden="true"></i>
              </a>
          </router-link>
          <li class="nav-item d-xl-none pe-3 d-flex align-items-center">
            <a class="nav-link text-body p-0" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
</template>

<script>
export default {
  props: ["title"],
  name:"Navbar",
}
</script>

<style>



</style>