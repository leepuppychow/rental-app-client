<template>
    <div class="property">
        <h4>{{ property.name }}</h4>
        <h5>{{ property.street }}</h5>
        <h5>{{ property.city + ', ' + property.state }}</h5>
    </div>
    
</template>

<script>
export default {
    name: 'Property',
    props: ['property'],
    data() {
        return {

        }
    }
    
}
</script>

<style lang="scss">
    .property {
        border: solid blue 1px;
        width: 75%;
        height: 80%;
        margin: auto;
    }
</style>


