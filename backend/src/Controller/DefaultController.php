<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class DefaultController extends AbstractController
{
    #[Route('/api', name: 'homepage', methods: ['GET'])]
    public function index_base(): JsonResponse
    {
        return $this->json(['message' => 'API OK ✅ (Homepage)']);
    }
}
