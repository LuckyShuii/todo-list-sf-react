<?php

namespace App\Controller;

use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/task', name: 'task_base_url')]
final class TaskController extends AbstractController
{
    #[Route('/all', name: '_task_index', methods: ['GET'])]
    public function index(TaskRepository $taskRepository): JsonResponse
    {
        $tasks = $taskRepository->findAll();

        return $this->json([
            'tasks' => $tasks,
        ]);
    }
}
