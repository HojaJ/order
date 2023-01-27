<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'product_name' => fake()->text(15),
            'description' => fake()->text(30),
            'total_price'   => fake()->numberBetween(20,100),
            'weight'   => fake()->numberBetween(1,10)
        ];
    }
}
