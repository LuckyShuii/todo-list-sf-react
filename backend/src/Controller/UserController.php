<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/user', name: 'user_base_url')]
final class UserController extends AbstractController
{
    #[Route('/all', name: '_user_index', methods: ['GET'])]
    public function index(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        return $this->json([
            'users' => $users,
        ]);
    }

    #[Route('/register', name: '_user_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $message = 'User registered successfully';

        if (empty($data['username']) || empty($data['password'])) {
            $message = 'Username and password are required';
        }

        $user = new User();
        $user->setUsername($data['username']);
        $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT));
        $user->setRoles(['ROLE_USER']);

        $existingUser = $userRepository->findOneBy(['username' => $data['username']]);

        if ($existingUser) {
            $message = 'Username already exists';
        } else {
            $entityManager->persist($user);
            $entityManager->flush();
        }

        return $this->json([
            'messsage' => $message,
        ]);
    }
}
