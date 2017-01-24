<template>
   <div class="container" id="suji-container">
       <div class="row">
         <div  class="col-sm-9 left-container" >
            <div class="b-title"><strong>最美的不是下雨天,而是与你躲过雨的屋檐.</strong></div>
            <div class="col-sm-12" style="padding:0" v-for="item in sujiList">
                <div class="content-item" >
                    <span v-html="item.content"><span>
                </div>
            </div>
          </div>
          <div  class="col-sm-3 right-container">
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
              </router-link>
            </div>
             <div>
                <h4>其他博客</h4>
                <a href="http://139.196.32.78:7000/home#/home/channel" target="_blank">
                <div class="item-title">My Brower Blog</div></a>
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
      sujiList: [],
      channelList: [],
      friendList: [],
      readPostList: [],
      recentPostList: []
    }
  },
  methods: {
    loadSuji () {
      api.getPostList({type: 'suji'}).then((res) => {
        this.sujiList = res.data.data.posts
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
  created () {
    this.loadSuji()
    this.loadChannel()
    this.loadFriend()
    this.loadRead()
    this.loadRecent()
  }
}
</script>
