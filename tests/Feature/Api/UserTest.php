<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_receive_a_json_unauthorized_response(): void
    {
        $response = $this->get('/api/user');

        $response->assertUnauthorized();
        $response->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_authenticated_users_receive_their_profile(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/user');

        $response->assertOk();
        $response->assertJson(['id' => $user->id, 'email' => $user->email]);
        $response->assertJsonMissingPath('password');
    }

    public function test_requests_from_the_spa_are_stateful(): void
    {
        $response = $this->getJson('/api/user', ['Referer' => config('app.url')]);

        $response->assertUnauthorized();
        $response->assertCookie('XSRF-TOKEN');
    }

    public function test_requests_from_other_origins_are_not_stateful(): void
    {
        $response = $this->getJson('/api/user', ['Referer' => 'https://example.com']);

        $response->assertUnauthorized();
        $response->assertCookieMissing('XSRF-TOKEN');
    }

    public function test_unknown_api_routes_return_json_not_the_spa(): void
    {
        $response = $this->get('/api/does-not-exist');

        $response->assertNotFound();
        $response->assertHeader('Content-Type', 'application/json');
    }
}
