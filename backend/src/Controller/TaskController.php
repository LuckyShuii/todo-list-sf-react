<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/task', name: 'task_base_url')]
final class TaskController extends AbstractController
{
    #[Route('/all', name: '_task_index', methods: ['GET'])]
    public function index(TaskRepository $taskRepository): JsonResponse
    {
        $tasks = $taskRepository->findAll();
        $data = array_map(fn($task) => $task->toArray(), $tasks);

        return $this->json([
            'tasks' => $data
        ]);
    }

    #[Route('/edit/status/{id}', name: '_task_edit_status', methods: ['PUT'])]
    public function edit_status(Request $request, int $id, TaskRepository $taskRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $task = $taskRepository->find($id);

        if (!$task) {
            return $this->json([
                'message' => 'Task not found',
            ], 404);
        }

        $task->setIsDone(!$task->isDone());

        $entityManager->persist($task);
        $entityManager->flush();

        return $this->json([
            'message' => 'Task status updated successfully',
        ]);
    }

    #[Route('/delete/{id}', name: '_task_delete', methods: ['DELETE'])]
    public function delete(int $id, TaskRepository $taskRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $task = $taskRepository->find($id);

        if (!$task) {
            return $this->json([
                'message' => 'Task not found',
            ], 404);
        }

        $entityManager->remove($task);
        $entityManager->flush();

        return $this->json([
            'message' => 'Task deleted successfully',
        ]);
    }

    #[Route('/add', name: '_task_add', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $task = new Task();

        $task->setName($data['name']);
        $task->setIsDone(false);
        $task->setLimitDate(new \DateTime($data['limit_date']));
        $task->setImportance($data['importance']);

        $entityManager->persist($task);
        $entityManager->flush();

        return $this->json([
            'message' => 'Task added successfully',
            'task' => $task->toArray(),
        ]);
    }
}
