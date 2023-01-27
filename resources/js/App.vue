<template>
    <PageComponent>
        <template v-slot:header>
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900">Orders</h1>
                    <Button @click="$store.commit('openCreateModal')"  class="bg-gray-500">Add new Order</Button>
                </div>
            </div>
        </template>
    <OrderList />
    </PageComponent>
    <Modal>
        <template v-slot:header>
            Order Modal
        </template>
        <template v-slot:body>
            <Form />
        </template>
    </Modal>
</template>



<script setup>
    import PageComponent from "@/components/PageComponent.vue";
    import OrderList from "@/components/OrderList.vue";
    import Button from "@/components/Button.vue";
    import Modal from "@/components/Modal.vue";
    import Form from "@/components/Form.vue";
</script>

<style scoped>

</style>
