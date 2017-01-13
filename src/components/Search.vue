<template>
  <div class="container" id="home-container">
    <div class="row">
      <div  class="col-sm-9 left-container">
         <div>
            <div class="b-title"><strong>漂洋过海来找你</strong></div>
            <router-link :to="'/details/'+item._id+'/'+item.type.channel"  v-for="item in postList">
            <div class="content-item">
              <div class="col-sm-10 post-title">
                  <span>#</span>
                  <span>{{item.view_count}}</span> /
                  <span>{{item.comment_count}}</span>
                  <span v-if="item.is_top" class="is_top">置顶</span>
                  <span class="title">{{item.title}}</span>
              </div>
              <div class="col-sm-2 post-date">
                  <span>01-11 12:32</span>
              </div>
            </div></router-link>
         </div>
      </div>
      <div  class="col-sm-3  right-container">
           <div>
                <h4>阅读排行</h4>
                <router-link :to="'/details/'+item._id+'/'+item.type.channel" v-for="item in readPostList">
                   <div class="item-title">{{item.title}}</div>
                </router-link >
            </div>
            <div>
                <h4>近期发布</h4>
                <router-link :to="'/details/'+item._id+'/'+item.type.channel"   v-for="item in recentPostList">
                  <div class="item-title">{{item.title}}</div>
                </router-link >
            </div>
            <div>
                 <h4>云标签组</h4>
                 <router-link :to="'/tagForPost/'+item._id" v-for="item in channelList" class="item-tag">
                     <span>{{item.name}}</span>
                 </router-link >
            </div>
            <div>
                <h4>其他博客</h4>
                <a href="http://139.196.32.78:7000/home#/home/channel" target="_blank">
                 <div class="item-title">
                    My Brower Blog
                 </div>
                </a>
            </div>
            <div>
               <h4>友情链接</h4>
               <div class="item-title" v-for="item in friendList">
                 <a class="friend-name" v-bind:href="item.url" target="_blank">{{item.name}}</a>
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
      postList: [],
      channelList: [],
      friendList: [],
      readPostList: [],
      recentPostList: []
    }
  },
  methods: {
    loadPost () {
      let searchText = this.$route.params.searchText
      let tag = this.$route.params.tag
      let params = {}
      if (searchText) params.searchText = searchText
      if (tag) params.tag = tag
      api.search(params).then((res) => {
        this.postList = res.data.data.postList
      })
    },
    loadChannel () {
      api.getChannel({}).then((res) => {
        this.channelList = res.data.data.channels
      })
    },
    loadFriend () {
      api.getFriend({}).then((res) => {
        this.friendList = res.data.data.friendList
      })
    },
    loadRead () {
      api.getReadPost({}).then((res) => {
        this.readPostList = res.data.data.postList
      })
    },
    loadRecent () {
      api.getRecentPost({}).then((res) => {
        this.recentPostList = res.data.data.postList
      })
    }
  },
  watch: {
    $route () {
      this.loadPost()
    }
  },
  created () {
    this.loadPost()
    this.loadChannel()
    this.loadFriend()
    this.loadRead()
    this.loadRecent()
  }
}
</script>
