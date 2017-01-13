<template>
     <div class="container" id="about-container">
       <div class="row">
         <div  class="col-sm-9" style="background-color:#fff;padding:5px;padding-left:20px;box-shadow: 0 0 3px 3px #fff;">
            <h3>About Me</h3>
            <h5>Author : linkenliu</h5>
            <h5>Email : 3245813812@qq.com</h5>
            <h5>Github : <a href="https://github.com/linkenliu" target="_blank">https://github.com/linkenliu</a></h5>
            <h3>About Blog</h3>
            <h5 class="about_blog">
                本博客由nodejs开发,架构为Node+Express+Mongodb,它是一门很优秀的语言,有着活跃的社区,现在的它无论是在前端还是在后端都有着它的身影,我相信node是未来的趋势.当然还有很多人对它有种不朽的态度,甚至有人认为它的活动范围只是在前端;但事实并不是这样,现在的它无论是在前端还是在后端都有着不俗的表现.</h5>
            <h3>About Framework</h3>
            <h5>Framework : Nodejs+Express+Mongodb+Vue</h5>
            <h5>Github : <a href="https://github.com/linkenliu/blog_vue.git" target="_blank">https://github.com/linkenliu/blog_vue.git</a>
            </h5>


            <div class="leave_container">
             <h2>留言板</h2>
             <hr/>
             <div class="leave_content col-sm-12">
                 <div class="col-sm-12 leave_item" v-for="item in leaveList">
                     <div class="username">
                         <span>{{item.username}}说:</span>
                     </div>
                     <div class="content">
                         {{item.content}}
                     </div>
                     <div class="col-sm-12 date">
                         12-2 23:12
                     </div>
                 </div>
             </div>
             <div class="col-sm-12">
                 <h4>您的留言:</h4>
                 <textarea class="form-control" rows="3" v-model="leave.content"></textarea>
                 <h4>您的大名:</h4>
                 <input class="form-control" v-model="leave.username"/>
                 <button type="button" id="sendLeave"
                         @click="sendLeave()" class="btn btn-info">Send
                 </button>
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
                 <div v-for="item in channelList" class="item-tag" >
                     <span>{{item.name}}</span>
                 </div>
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
      channelList: [],
      friendList: [],
      leaveList: [],
      readPostList: [],
      recentPostList: [],
      leave: {}
    }
  },
  methods: {
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
    loadLeave () {
      api.getLeave({}).then((res) => {
        this.leaveList = res.data.data.leaveList
      })
    },
    sendLeave () {
      let leave = this.leave
      if (!leave.content) {
        return window.layer.msg('请输入留言内容', function () {})
      } else if (!leave.username) {
        return window.layer.msg('请输入你的大名', function () {})
      } else {
        window.$('#sendLeave').attr('disabled', 'disabled')
        api.postLeave({object: this.leave}).then((res) => {
          window.$('#sendLeave').removeAttr('disabled')
          if (res.data.success) {
            window.layer.msg('留言成功')
            this.loadLeave()
          } else {
            return window.layer.msg('留言失败')
          }
        })
      }
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
    this.loadChannel()
    this.loadFriend()
    this.loadLeave()
    this.loadRead()
    this.loadRecent()
  }
}
</script>
