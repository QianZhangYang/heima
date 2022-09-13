<template>
  <div class="editbox">
    <van-cell title="我的频道" :border="false"
      ><template
        ><van-button round size="mini" class="btn" @click="isEdit = !isEdit">{{
          isEdit ? '完成' : '编辑'
        }}</van-button></template
      ></van-cell
    >
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: value.name === '推荐' }"
          v-for="(value, index) in mychannel"
          :key="value.id"
          :text="value.name"
          :icon="isEdit && value.name !== '推荐' ? 'cross' : ''"
          @click="handle(value, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <van-cell title="推荐频道" :border="false" />

    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="value in rechannel"
          :key="value.id"
          :text="value.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllchannelAPI } from '@/api'
export default {
  name: 'edit',
  props: {
    mychannel: Array
  },
  data() {
    return {
      isEdit: false,
      Allchannel: []
    }
  },
  computed: {
    rechannel() {
      return this.Allchannel.filter((item) => {
        return !this.mychannel.find((i) => i.id === item.id)
      })
    }
  },
  created() {
    this.getAllchannel()
  },
  methods: {
    async getAllchannel() {
      const { data } = await getAllchannelAPI()
      this.Allchannel = data.data.channels
      console.log(data)
    },
    handle({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除')
      } else {
        // 1.关闭页面
        // 2.跳转页面
        this.$emit('changeactive', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.editbox {
  padding-top: 92px;
}
.btn {
  color: red;
  border-color: red;
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
