<template>
    <nav class="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
        <div class="container"><a
                class="navbar-brand d-flex align-items-start align-items-sm-center align-items-md-center align-items-lg-center align-items-xl-center align-items-xxl-center"
                href="https://github.com/devsanthoshmk/places-data"><span
                    class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg
                        xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-google-maps">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 9.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"></path>
                        <path d="M6.428 12.494l7.314 -9.252"></path>
                        <path d="M10.002 7.935l-2.937 -2.545"></path>
                        <path d="M17.693 6.593l-8.336 9.979"></path>
                        <path
                            d="M17.591 6.376c.472 .907 .715 1.914 .709 2.935a7.263 7.263 0 0 1 -.72 3.18a19.085 19.085 0 0 1 -2.089 3c-.784 .933 -1.49 1.93 -2.11 2.98c-.314 .62 -.568 1.27 -.757 1.938c-.121 .36 -.277 .591 -.622 .591c-.315 0 -.463 -.136 -.626 -.593a10.595 10.595 0 0 0 -.779 -1.978a18.18 18.18 0 0 0 -1.423 -2.091c-.877 -1.184 -2.179 -2.535 -2.853 -4.071a7.077 7.077 0 0 1 -.621 -2.967a6.226 6.226 0 0 1 1.476 -4.055a6.25 6.25 0 0 1 4.811 -2.245a6.462 6.462 0 0 1 1.918 .284a6.255 6.255 0 0 1 3.686 3.092z">
                        </path>
                    </svg></span>
                <h1>Globex Places Data</h1>
            </a></div>
    </nav>
    <div class="d-flex justify-content-center align-items-center" style="overflow: hidden;min-height: 78vh;">
        <div class="row w-100 animate-me" style="margin-bottom: 150px;">
            <div class="col-md-8 col-sm-12 mx-auto">
                <div class="card m-auto" style="max-width: 100%;">
                    <div :class="['card-body p-3',shaking]" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" title="<em>Example:</em> '<b>restaurants in Chennai</b>' or '<b>hospitals in Bangalore</b>'. Include a place type and city/area.">
                        <div class="d-flex align-items-center" >
                            <i class="fas fa-search text-body h4 m-0"></i>
                            <input v-model="input" @keyup.enter="act(input)"
                                class="form-control form-control-lg flex-shrink-1 form-control-borderless"
                                type="search" name="searchbar" placeholder="Enter business/place type & location"
                                 >
                            <!-- Dropdown button -->
                            <!-- <div class="btn-group "> -->
                            <div class="btn-group nbts">
                                <button class="btn dropdown-toggle btn-lg" type="button" id="dropdownMenuButton"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Advanced
                                </button>
                                <!-- Dropdown menu -->
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a class="dropdown-item d-flex align-items-center justify-content-center"
                                            href="#">
                                            Comming Soon...
                                            <i class="fas fa-info-circle"></i>
                                        </a></li>

                                </ul>
                                <button :disabled="!spin" @click="act(input)" :class="['btn', btncolor,'btn-lg']"
                                    style="border-top-left-radius: 2px; border-bottom-left-radius:2px;"><span
                                        :class="{'d-none':spin, 'spinner-grow text-primary':true}" role="status"
                                        aria-hidden="true"></span>{{action}}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Centered Button Group -->
                <div class="justify-content-center mt-1 smbts">
                    <div class="btn-group">
                        <button class="btn dropdown-toggle btn-lg" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Advanced
                        </button>
                        <!-- Dropdown menu -->
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item d-flex align-items-center justify-content-center" href="#">
                                    Comming Soon...
                                    <i class="fas fa-info-circle"></i>
                                </a></li>

                        </ul>

                        <button @click="act(input)" :class="['btn', btncolor,'btn-lg']"
                            style="border-top-left-radius: 2px; border-bottom-left-radius:2px;"><span
                                :class="{'d-none':spin, 'spinner-grow text-primary':true}" role="status"
                                aria-hidden="true"></span>{{action}}</button>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <footer class="d-flex justify-content-center align-items-stretch" style="position: sticky;">
            <ul class="list-inline bg-dark d-flex justify-content-center align-items-stretch px-3" style="border-radius: 45px;">
                <li class="list-inline-item me-4">
                    <a href="https://github.com/devsanthoshmk" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                            viewBox="0 0 16 16" class="bi bi-github text-light">
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8">
                            </path>
                        </svg></a>
                </li>
                <li class="list-inline-item me-4">
                    <a href="https://www.linkedin.com/in/m-k-santhosh-689287258/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                            viewBox="0 0 16 16" class="bi bi-linkedin text-light">
                            <path
                                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4">
                            </path>
                        </svg></a>
                </li>
                <li class="list-inline-item">
                    <a href="https://www.instagram.com/mksantho.sh/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                            viewBox="0 0 16 16" class="bi bi-instagram text-light">
                            <path
                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
                            </path>
                        </svg></a>
                </li>
            </ul>
    </footer>
</template>

<script>
import { search, make_excel } from './gmap_data.js';
import Tooltip from 'bootstrap/js/dist/tooltip';

export default {
  data() {
    return {
        input:"",                //to get the search input from user
        action: "Search",        //to make tha search button dynamic i.e for both download and search
        btncolor: "btn-success", //color of the button to change accordingly
        shaking:"",              //shake search bar to indicate no input value
        spin : true,

        row_datas:[],            //for using gmap_data.js search return globally
    };
  },
  methods: {
      //dev meths
      log(ob){
        console.log(ob);
      },
      async act(query){
        if (query.trim()){ 
            if (this.action==="Search"){
              this.spin=false;
              this.action="";
              this.btncolor='border';
              try {
                this.rows = await search(query);
                // console.log(this.rows)
                console.log("Final full_list:", this.rows.length);
                this.btncolor='btn-primary';
                this.spin=true;
                this.action="Download";
              } catch(error){
                console.error('There was a problem with the search function:', error);
              };
          } else {
            console.log(this.rows);
            make_excel(this.rows,query);
            this.btncolor='btn-success'
            this.action="Search";
            // this.input="";
          }
             

            
          } 
          
          
        }
      },
      mounted() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => new Tooltip(el));
      }
};
</script>

<style scoped>
.smbts {
            display: none;
        }

        @media (max-width: 767.98px) {
            .nbts {
                display: none;
            }
        }

        @media (max-width: 767.98px) {
            .smbts {
                display: flex;
            }
        }
</style>
