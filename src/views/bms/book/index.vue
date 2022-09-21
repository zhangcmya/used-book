<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          size="small"
          @click="handleSearchList()"
        >
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          size="small"
          @click="handleResetSearch()"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="商品名称" clearable />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" style="margin-left: 20px" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="bookTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.imgFront" style="width: 50px; height: 50px">
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{ scope.row.subName }}</template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="是否推荐" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.isHot === false ? "否" : "是" }}</template>
        </el-table-column>
        <el-table-column label="是否上架" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.isActive === 0 ? "否" : "是" }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="isEdit?'编辑图书':'添加图书'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="bookForm"
        :model="book"
        label-width="150px"
        size="small"
      >
        <el-form-item label="名称：">
          <el-input v-model="book.name" style="width: 250px" />
        </el-form-item>
        <el-form-item label="标题：">
          <el-input v-model="book.subName" style="width: 250px" />
        </el-form-item>
        <el-form-item label="封面：">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9090/bms/upload"
            :show-file-list="false"
            :on-success="handleFrontAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="book.imgFront" :src="book.imgFront" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="背面：">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9090/bms/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="book.imgBack" :src="book.imgBack" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="book.price" style="width: 250px" />
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-radio-group v-model="book.isHot">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="book.isActive">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleDialogConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { formatDate } from '@/utils/date'
import { fetchList, updateBook, createBook, deleteBook } from '@/api/book'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
  category: 0
}
const defaultBook = {
  id: null,
  imgFront: null,
  imgBack: null,
  name: null,
  author: null,
  price: null,
  category: 0,
  press: null,
  stock: 0,
  status: 0,
  publicationDate: null
}
export default {
  name: 'BookList',
  filters: {
    formatDateTime(time) {
      console.log(time)
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      book: Object.assign({}, defaultBook),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocBookId: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleAdd() {
      this.dialogVisible = true
      this.isEdit = false
      this.book = Object.assign({}, defaultBook)
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该图书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBook(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleUpdate(index, row) {
      this.dialogVisible = true
      this.isEdit = true
      this.book = Object.assign({}, row)
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateBook(this.book.id, this.book).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        } else {
          createBook(this.book).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.result.list
        this.total = response.result.total
      })
    },
    handleFrontAvatarSuccess(res, file) {
      console.log(res, 'res')
      this.book.imgFront = 'http://192.168.12.66:9090' + res.result
    },
    handleAvatarSuccess(res, file) {
      this.book.imgBack = 'http://192.168.12.66:9090' + res.result
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

