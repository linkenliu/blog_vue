<template>
  <div class="container" id="home-container">
    <div class="row">
      <div class="col-sm-9 left-container">
        <div>
          <div class='b-title'><strong>奋斗从来不会打烊</strong></div>
          <router-link :to="'/details/'+item._id+'/'+item.type.channel._id" v-for="item in postList">
            <div class="content-item">
              <div class="col-sm-10 post-title">
                <span>#</span>
                <span>{{item.view_count}}</span> /
                <span>{{item.comment_count}}</span>
                <span v-if="item.is_top" class="is_top">置顶</span>
                <span class="title">{{item.title}}</span>
              </div>
              <div class="col-sm-2 post-date">
                <span>{{item.create_date | converDate}}</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="pager" id="pager" style="text-align: left" v-if="totalCount>this.pagesize">
          <template v-for="item in pageCount+1">
            <span v-if="item==1 && pageCurrent != 1" class="btn btn-default" v-on:click="showPage(pageCurrent-1,$event)">
                            <<
                        </span>
            <span v-if="item==1 && pageCurrent == 1" class="btn btn-default disabled">
                            <<
                        </span>
            <span v-if="item==1" class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
            <span v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled">
                            ...
                        </span>
            <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount"
                  class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
            <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled">
                            ...
                        </span>
            <span v-if="item==pageCount && pageCount>1" class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
            <span v-if="pageCurrent == Math.ceil(totalCount/pagesize) && item == pageCount " class="disabled btn btn-default">
              >>
            </span>
            <span v-if="item==pageCount && pageCurrent != Math.ceil(totalCount/pagesize)" class="btn btn-default" v-on:click="showPage(pageCurrent+1,$event)">
                            >>
                        </span>
          </template>
        </div>

      </div>
      <div class="col-sm-3 right-container">
        <div>
          <h4>阅读排行</h4>
          <router-link :to="'/details/'+item._id+'/'+item.type.channel" v-for="item in readPostList">
            <div class="item-title">{{item.title}}</div>
          </router-link>
        </div>
        <div>
          <h4>近期发布</h4>
          <router-link :to="'/details/'+item._id+'/'+item.type.channel" v-for="item in recentPostList">
            <div class="item-title">{{item.title}}</div>
          </router-link>
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
        recentPostList: [],
        totalCount: 0,
        pageCount: 0,
        pageCurrent: 1,
        pagesize: 20,
        showPages: 5,
        showPagesStart: 1,
        showPageEnd: 100
      }
    },
    methods: {
      loadPost () {
        api.getPostList({type: 'post'}).then((res) => {
          let postList = res.data.data.posts
          this.postList = postList
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
      },
      showPage: function (pageIndex, $event, forceRefresh) {
        api.getPostList({type: 'post', pageIndex: pageIndex, pageSize: this.pagesize}).then((res) => {
          let postList = res.data.data.posts
          let postCount = res.data.data.postCount
          this.postList = postList
          this.totalCount = postCount
          if (pageIndex > 0) {
            if (pageIndex > this.pageCount) {
              pageIndex = this.pageCount
            }
            var buttons = $("#pager").find("span");
            for (var i = 0; i < buttons.length; i++) {
              if (buttons.eq(i).html() != pageIndex) {
                buttons.eq(i).removeClass("active");
              }
              else {
                buttons.eq(i).addClass("active");
              }
            }
            if(0 == pageIndex){
              buttons.eq(1).addClass("active");
            }
            //判断数据是否需要更新
            var currentPageCount = Math.ceil(this.totalCount / this.pagesize);
            if (currentPageCount != this.pageCount) {
              pageIndex = 1;
              this.pageCount = currentPageCount;
            }
            else if (this.pageCurrent == pageIndex && currentPageCount == this.pageCount && typeof (forceRefresh) == "undefined") {
              return;
            }
            this.pageCurrent = pageIndex;
            //计算分页按钮数据
            if (this.pageCount > this.showPages) {
              if (pageIndex <= (this.showPages - 1) / 2) {
                this.showPagesStart = 1;
                this.showPageEnd = this.showPages - 1;
              }
              else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
                this.showPagesStart = this.pageCount - this.showPages + 2;
                this.showPageEnd = this.pageCount;
              }
              else {
                this.showPagesStart = pageIndex - (this.showPages - 3) / 2;
                this.showPageEnd = pageIndex + (this.showPages - 3) / 2;
              }
            }
          }
        })
      }
    },
    watch: {
      $route () {
        this.showPage(this.pageCurrent, null, true)
      }
    },
    created () {
      this.loadChannel()
      this.loadFriend()
      this.loadRead()
      this.loadRecent()
      this.showPage(this.pageCurrent, null, true)
    }
  }

</script>
