<template>
  <Form
    ref="formValidate"
    :model="localForm"
    :rules="rules"
    :label-position="labelPosition"
    :label-width="labelWidth"
  >
    <FormItem
      v-for="(item, key) in form"
      :key="key"
      :label="item.label"
      :prop="item.key"
    >
      <template v-if="item.formType === 'input'">
        <Input v-model="localForm[item.key]" />
      </template>
    </FormItem>
    <FormItem>
      <Button @click="handleReset" style="margin-right: 8px">重置</Button>
      <Button type="primary" @click="handleSubmit">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'FormCreator',
  props: {
    form: {
      type: Array,
      required: true
    },

    rules: {
      type: Object,
      required: true
    },

    labelPosition: {
      type: String,
      default: 'right',
      validator: (value) => {
        return [
          'left',
          'right',
          'top'
        ].indexOf(value) !== -1
      }
    },

    labelWidth: {
      type: Number,
      default: 150
    }
  },
  data () {
    return {
      localForm: {}
    }
  },
  created () {
    this.transformLocalForm()
  },
  methods: {
    handleReset () {
      this.$refs['formValidate'].resetFields()
    },
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.$emit('on-submit', this.localForm)
        }
      })
    },
    transformLocalForm (newForm) {
      const cur = newForm || this.form
      this.localForm = this.form.reduce((accumulator, item) => {
        accumulator[item.key] = item.val
        return accumulator
      }, {})
    }
  },
  watch: {
    form (newForm) {
      this.transformLocalForm(newForm)
    }
  }
}
</script>
