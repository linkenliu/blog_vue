<template>
   <div class="container" id="details-container">
       <div class="row">
         <div  class="col-sm-9 left-container">
              <div style="text-align:center">
                  <h2>{{post.title}}</h2>
                  <span>发布于:{{post.create_date | converDate}}</span>&nbsp;&nbsp;&nbsp;<span>浏览/评论:{{post.view_count}}/{{post.comment_count}}</span>
              </div>
              <hr/>
              <div v-html="post.content"></div>

              <hr class="fhr"/>
              <h2>留言板</h2>
              <hr/>
              <div class="comment-content col-sm-12">
                  <div class="col-sm-12 comment-item" v-for="item in commentList">
                      <div class="username">
                          <span>{{item.username}}说:</span>
                      </div>
                      <div class="content">
                          {{item.content}}
                      </div>
                      <div class="col-sm-12 date">
                          12-23 12:12
                      </div>
                  </div>
              </div>
              <div class="comment col-sm-12">
                  <h4>您的留言:</h4>
                  <textarea class="form-control" rows="3" v-model="user.content"></textarea>
                  <h4>您的大名:</h4>
                  <input class="form-control" v-model="user.username"/>
                  <h4>电子邮箱:</h4>
                  <input class="form-control" v-model="user.email"/>
                  <h4>个人网站:</h4>
                  <input class="form-control" v-model="user.personage_site"/>
                  <button type="button" id="sendComment" @click="sendComment(post._id)" class="btn btn-info">Send</button>
              </div>
        </div>
        <div  class="col-sm-3 right-container">
          <div>
               <h4>相关推荐</h4>
                <router-link :to="'/details/'+item._id+'/'+item.type.channel"   v-for="item in correlationPostList">
                    <div class="item-title">{{item.title}}</div>
                </router-link >
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
      post: '',
      user: {},
      commentList: [],
      correlationPostList: []
    }
  },
  methods: {
    load () {
      let _id = this.$route.params._id
      api.clickView({_id: _id}).then((res) => {
        api.getPost({_id: _id, model: 'post'}).then((res) => {
          this.post = res.data.data.post
        })
      })
    },
    loadCorrelation () {
      let type = this.$route.params.type
      let _id = this.$route.params._id
      api.getCorrelationPost({type: type, _id: _id}).then((res) => {
        this.correlationPostList = res.data.data.postList
      })
    },
    loadComment () {
      let _id = this.$route.params._id
      api.getComment({_id: _id}).then((res) => {
        this.commentList = res.data.data.commentList
      })
    },
    sendComment (_id) {
      if (!this.user.content) {
        return window.layer.msg('请输入留言内容', function () {})
      } else if (!this.user.username) {
        return window.layer.msg('请输入你的大名', function () {})
      }
      if (this.user.email) {
        if (!/^\w+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.user.email)) {
          return window.layer.msg('邮箱格式有误', function () {})
        }
      }
      this.user._id = _id
      window.$('#sendComment').attr('disabled', 'disabled')
      api.postComment({object: this.user}).then((res) => {
        console.log(JSON.stringify(res))
        window.$('#sendComment').removeAttr('disabled')
        if (res.data.success) {
          window.layer.msg('评论成功')
          this.loadComment()
          this.load()
        } else {
          return window.layer.msg('评论失败')
        }
      })
    }
  },
  watch: {
    $route () {
      this.load()
      this.loadComment()
      this.loadCorrelation()
    }
  },
  created () {
    this.load()
    this.loadComment()
    this.loadCorrelation()
  }
}
</script>
