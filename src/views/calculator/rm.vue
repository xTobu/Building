<template>
    <div class="rm-container">
        <h1>Rep Max Calculator</h1>    
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>請輸入您的成績</span>                
            </div>
            <el-form :model="InputForm" ref="InputForm" label-width="100px" size="medium" >
            <el-form-item
                label="次數"
                prop="reps"
                :rules="[
                { required: true, message: '次數不能為空'},
                { type: 'number', message: '次數必須為數字'}
                ]"
            >               
                <el-select v-model.number="InputForm.reps" placeholder="請選擇" @input="onChangeInputData">
                    <el-option-group
                    v-for="group in optionsReps"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item
                label="重量"
                prop="weight"
                :rules="[
                { required: true, message: '重量不能為空'},
                { type: 'number', message: '重量必須為數字'}
                ]"
            >
                <el-input type="text" v-model.number="InputForm.weight" auto-complete="off" @input="onChangeInputData">
                    <template slot="append">kg</template>
                </el-input>
            </el-form-item>
            <el-form-item v-show="false">
                <el-button type="primary" @click="submitForm('InputForm')">計算</el-button>
                <el-button @click="resetForm('InputForm')">重置</el-button>
            </el-form-item>
        </el-form>
        </el-card>
        
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>計算結果</span>                
            </div>
            <el-form  ref="" label-width="100px" size="medium" >
                <el-form-item
                    label="次數"
                    prop="reps"
                >               
                    <el-select v-model.number="ResultForm.reps" placeholder="請選擇" @change="onChangeResultReps">
                        <el-option-group
                        v-for="group in optionsReps"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="重量"
                    prop="weight"
                >
                    <el-input type="text" v-model.number="ResultForm.weight" auto-complete="off" disabled="" >
                        <template slot="append">kg</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-card>
            
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" >
.rm {
  &-container {
    margin: 30px;
    width: 40%;
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      border-color: #e4e7ed;
      color: #606266;
      cursor: not-allowed;
    }
    .el-input,
    .el-select {
      width: 230px;
    }
  }
}
</style>

<script>
import {} from '@/api/table'

export default {
  data() {
    return {
      rm_refdata: [100, 95, 93, 90, 87, 85, 83, 80, 77, 75, 70, 67, 65, 60],
      InputForm: {
        reps: null,
        weight: null
      },
      ResultForm: { one_rm: null, reps: 0, weight: null },
      optionsReps: [
        {
          label: '力量',
          options: [
            {
              value: 0,
              label: '1'
            },
            {
              value: 1,
              label: '2'
            },
            {
              value: 2,
              label: '3'
            },
            {
              value: 3,
              label: '4'
            },
            {
              value: 4,
              label: '5'
            }
          ]
        },
        {
          label: '肌肥大',
          options: [
            {
              value: 5,
              label: '6'
            },
            {
              value: 6,
              label: '7'
            },
            {
              value: 7,
              label: '8'
            },
            {
              value: 8,
              label: '9'
            },
            {
              value: 9,
              label: '10'
            },
            {
              value: 10,
              label: '11'
            },
            {
              value: 11,
              label: '12'
            }
          ]
        },
        {
          label: '耐力',
          options: [
            {
              value: 12,
              label: '15'
            },
            {
              value: 13,
              label: '20'
            }
          ]
        }
      ]
    }
  },

  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 取得1RM的重量
          this.ResultForm.one_rm = this.getOneRM(
            this.InputForm.reps,
            this.InputForm.weight
          )

          // 取得結果重量
          this.ResultForm.weight = this.calRM(this.ResultForm.reps)
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getOneRM(reps, weight) {
      return Math.round(weight / (this.rm_refdata[reps] / 100))
    },
    calRM(reps) {
      return Math.round(this.ResultForm.one_rm * (this.rm_refdata[reps] / 100))
    },
    onChangeInputData(res) {
      this.submitForm('InputForm')
    },
    onChangeResultReps() {
      this.submitForm('InputForm')
    }
  },
  computed: {},
  mounted() {}
}
</script>
