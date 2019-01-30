<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    created() {
    },
    mounted() {
    },
    components: {
    },
    computed: {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import './style/common';
#app{
    height: 100%;
    overflow: hidden;
}
#music{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
}
</style>
