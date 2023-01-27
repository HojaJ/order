<template>
    <div v-if="orders.loading" class="flex justify-center">Loading...</div>

    <div v-else-if="orders.data.length">

        <select v-model="selectedSort" @change="changeOption">
            <option
                v-for="option in $store.state.sortOptions"
                :key="option.value"
                :value="option.value"
            >
                {{ option.name }}
            </option>
        </select>

        <div class="overflow-x-auto">
            <div class="w-full">
                <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto">
                        <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th class="py-3 px-6 text-left">ID</th>
                            <th class="py-3 px-6 text-center">Product Name</th>
                            <th class="py-3 px-6 text-center">Weight</th>
                            <th class="py-3 px-6 text-center">Total price</th>
                            <th class="py-3 px-6 text-center">Description</th>
                            <th class="py-3 px-6 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm font-light">
                        <tr
                            class="border-b border-gray-200 hover:bg-gray-100"
                            v-for="order in orders.data"
                            :key="order.id"
                        >
                            <td class="py-3 px-6 text-left text-lg font-medium">{{order.id}}</td>
                            <td class="py-3 px-6 text-center text-lg">{{order.product_name}}</td>
                            <td class="py-3 px-6 text-center text-lg">{{order.weight}}</td>
                            <td class="py-3 px-6 text-center text-lg">{{order.total_price}}</td>
                            <td class="py-3 px-6 text-center text-lg">{{order.description}}</td>

                            <td class="py-3 px-6 text-center">

                                <div class="flex item-center justify-center">

                                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click="editModal(order)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>

                                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click="deleteOrder(order)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>

                                </div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>

                <div class="flex justify-center mt-5">
                    <nav
                        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                        <a
                            v-for="(link, i) of orders.links"
                            :key="i"
                            :disabled="!link.url"
                            href="#"
                            @click="getForPage($event, link)"
                            aria-current="page"
                            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            :class="{'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':link.active}"
                            v-html="link.label"
                        >
                        </a>
                    </nav>
                </div>

            </div>
        </div>
    </div>

    <div v-else class="text-gray-600 text-center py-16">
        No Orders
    </div>
</template>

<script setup>
import store from "../store";
import {computed, ref} from "vue";

store.dispatch('getOrders');
const orders = computed(() => store.state.orders);
const selectedSort = ref({selectedSort: ''});

function getForPage(ev, link) {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }
    store.dispatch("getOrders", { url: link.url });
}

function editModal(order){
    store.commit('setCurrentOrder',order)
    store.commit('openCreateModal')
}

function changeOption() {
    store.commit('setSelectedSort', selectedSort.value)
    store.dispatch("getOrders");
}

function deleteOrder(order) {
    if (
        confirm(
            `Are you sure you want to delete this order? Operation can't be undone!!`
        )
    ) {
        store.dispatch("deleteOrder", order.id).then(() => {
            store.dispatch("getOrders");
        });
    }
}

</script>
