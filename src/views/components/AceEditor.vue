<template>
    <div class="ace-editor">
        <editor
                ref="_aceEditor"
                v-model="content"
                @init="editorInit"
                width="100%"
                height="200"
                lang="sql"
                theme="clouds"
                @keyup.enter.native='search'
                :options="{
    　　 enableBasicAutocompletion: true,
    　　 enableSnippets: true,
    　　 enableLiveAutocompletion: true,
  　　   tabSize:6,
    　　 fontSize:13,
    　　 showPrintMargin:false,   //去除编辑器里的竖线
      }"
        ></editor>
    </div>
</template>

<script>
    export default {
        name: 'AceEditor',
        props: {},
        watch: {},
        data() {
            return {
                content: "",
                num: 0,
            };
        },
        components: {
            editor: require("vue2-ace-editor")
        },
        methods: {
            editorInit() {//初始化
                require("brace/ext/language_tools"); //language extension prerequsite...
                require("brace/mode/sql"); //language
                require("brace/theme/clouds")
                require("brace/snippets/sql"); //snippet
            },
            getValue() {//获取编辑器中的值
                let value = this.$refs._aceEditor.editor.getValue()
                window.localStorage.sql = value
                return value
            },
            search(){
                // alert(this.getValue())
                // this.$emit("search")
            }

        },
        mounted() {
            this.editorInit();
            let sql = window.localStorage.sql
            this.$refs._aceEditor.editor.setValue(sql)
        }
    };
</script>

<style scoped>

</style>
