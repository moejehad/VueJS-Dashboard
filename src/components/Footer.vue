<template>
     <footer class="footer pt-3  ">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
              <div class="copyright text-center text-sm text-muted text-lg-end">
                © {{new Date().getFullYear()}}
                جميع الحقوق محفوظة
              </div>
            </div>
          </div>
        </div>
      </footer>
</template>

<script>
export default {
    name: "Footer",
}
</script>