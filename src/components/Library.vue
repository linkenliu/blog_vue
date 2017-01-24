<template>
   <div class="container" id="library-container">
       <div class="row">
         <div  class="col-sm-9 left-container">
            <div>
               <div class="b-title"><strong>雨下那么大,望你有个躲雨的地方.</strong></div>
               <div class="content-item" v-for="item in libraryList">
                 <a v-bind:href="item.url" target="_blank">
                    <div class="col-sm-10 post-title">
                        <span>#</span>
                        <span>{{item.title}}</span>
                    </div>
                    <div class="col-sm-2 post-date">
                        <span>{{item.create_date | converDate}}</span>
                    </div>
                 </a>
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
      libraryList: [],
      channelList: [],
      friendList: [],
      readPostList: [],
      recentPostList: []
    }
  },
  methods: {
    loadLibrary () {
      api.getLibrary({}).then((res) => {
        this.libraryList = res.data.data.libraryList
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
    this.loadLibrary()
    this.loadChannel()
    this.loadFriend()
    this.loadRead()
    this.loadRecent()
  }
}
</script>
