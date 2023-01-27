<template>
    <form @submit.prevent="saveOrder()">
        <div class="sm:rounded-md sm:overflow-hidden">
            <!-- Order Fields -->
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- Name -->
                <div>
                    <label
                    for="product_name"
                    class="block text-sm font-medium text-gray-700"
                    >
                        Product Name
                    </label
                    >
                    <input
                        required
                        type="text"
                        name="product_name"
                        id="product_name"
                        v-model="model.product_name"
                        autocomplete="product_name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <!--/ Name -->

                <!-- Weight -->
                <div>
                    <label
                    for="weight"
                    class="block text-sm font-medium text-gray-700"
                    >
                    Weight
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="weight"
                        id="weight"
                        v-model="model.weight"
                        autocomplete="weight"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <!-- Weight -->

                <!-- Total price -->
                <div>
                    <label
                    for="total_price"
                    class="block text-sm font-medium text-gray-700"
                    >
                    Total Price
                    </label>
                    <input
                        required
                        type="number"
                        step="0.01"
                        name="total_price"
                        id="total_price"
                        v-model="model.total_price"
                        autocomplete="total_price"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <!-- Total price -->

                <!-- Description -->
                <div>
                    <label
                    for="description"
                    class="block text-sm font-medium text-gray-700"
                    >
                    Description
                    </label>
                    <textarea
                    id="description"
                    rows="10"
                    name="description"
                    v-model="model.description"
                    autocomplete="description"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                    </textarea>
                </div>
                <!-- Description -->

            </div>
            <!--/ Order Fields -->

            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="store.commit('closeModal')" ref="cancelButtonRef">Cancel</button>
            </div>

        </div>
    </form>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import store from "../store";


let model = ref({
    product_name: "",
    weight: 0,
    total_price: 0,
    text: "",
});

watch(store.state.currentOrder.data, async (newVal, oldVal) => {
     model.value = {
            ...JSON.parse(JSON.stringify(store.state.currentOrder.data)),
        };
}, {immediate:true})



function saveOrder() {
    store.dispatch("saveOrder", { ...model.value }).then(({ data }) => {
        store.dispatch('getOrders');
        store.commit('closeModal');
    });
}
</script>

<style></style>
