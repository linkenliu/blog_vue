<template>
    <div class="container" id="demo-container">
          <div class="row">
            <div  class="col-sm-12 content-item">
               <div class="item">
                  <div class="col-sm-3" v-for="item in demoList">
                     <router-link :to="'/details/'+item._id+'/'+item.type.channel">
                       <div class="c-i">
                        <img v-bind:src="item.cover"/>
                        <p>{{item.title}}</p>
                       </div>
                     </router-link>
                  </div>
               </div>
            </div>
          </div>
    </div>
</template>

<script>
import api from '../api/index.js'
export default {
  data () {
    return {
      demoList: []
    }
  },
  methods: {
    loadDemo () {
      api.getPostList({type: 'demo'}).then((res) => {
        this.demoList = res.data.data.posts
      })
    }
  },
  watch: {
    $route () {
      this.loadDemo()
    }
  },
  created () {
    this.loadDemo()
  }
}
</script>
