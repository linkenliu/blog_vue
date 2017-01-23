<template>
  <nav class="navbar navbar-inverse  navbar-fixed-top ">
    <div class="container container-nav">
    	<div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="logoDic">
      <a class="logo"><img src="./../assets/piezi.jpg" style="margin-top: -12px;margin-left: -20px;max-width: 100%;"></a></div>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li v-for="item in topbarList"><a @click="go(item.value)" v-bind:class='{active:item.value==currentValue,noset:item.value!=currentValue}'>{{item.text}}</a></li>
        </ul>
         <input type="search" id="infinitySearch" @keyup.enter="myKeyup()" class="SearchInput" v-model="searchText" placeholder="Search">
            <label id="searchButton" for="infinitySearch" @click="search()" style="display: inline; opacity: 1;margin-left: -75px"></label>
      </div>
     </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      currentValue: '',
      searchText: '',
      topbarList: [
        {text: '首页', value: ''},
        {text: '速记', value: 'suji'},
        {text: '内库', value: 'library'},
        {text: '实例', value: 'demo'},
        {text: '关于', value: 'about'}
      ]
    }
  },
  methods: {
    go (value) {
      this.currentValue = value
      this.$router.push({
        path: '/' + value
      })
    },
    search () {
      if (this.searchText) {
        this.$router.push({
          path: '/search/' + this.searchText
        })
      }
    },
    myKeyup () {
      if (this.searchText) {
        this.$router.push({
          path: '/search/' + this.searchText
        })
      }
    }
  }
}
</script>


