<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->query('sort');
        if($sort != 'order_name' && $sort != 'total_price'){
            $orders = Order::latest()->paginate(20);
        }else{
            $orders = Order::orderBy($sort, 'ASC')->paginate(20);
        }
        return OrderResource::collection($orders);
    }

    public function store( OrderRequest $request)
    {
        $data = $request->validated();
        $order = Order::create($data);
        return OrderResource::make($order);
    }

    public function update(Order $order, OrderRequest $request){;
        $data = $request->validated();
        $order->update($data);
        return OrderResource::make($order);
    }

    public function destroy(Order $order, Request $request)
    {
        $order->delete();
        return response('',204);
    }

}
