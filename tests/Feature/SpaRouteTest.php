<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class SpaRouteTest extends TestCase
{
    /**
     * @return array<string, array{string}>
     */
    public static function spaPaths(): array
    {
        return [
            'home' => ['/'],
            'single segment' => ['/user'],
            'nested path' => ['/settings/profile'],
            'path starting with api' => ['/apis'],
            'path starting with up' => ['/update'],
        ];
    }

    #[DataProvider('spaPaths')]
    public function test_frontend_paths_render_the_react_app(string $path): void
    {
        $response = $this->get($path);

        $response->assertOk();
        $response->assertViewIs('app');
        $response->assertSee('<div id="app"></div>', false);
    }

    public function test_health_check_is_not_handled_by_the_spa(): void
    {
        $response = $this->get('/up');

        $response->assertOk();
        $response->assertDontSee('<div id="app"></div>', false);
    }
}
