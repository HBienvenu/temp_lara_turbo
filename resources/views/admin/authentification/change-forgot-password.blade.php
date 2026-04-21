@extends('admin.layouts.auth_layout', ['title' => 'Réinitialisation du mot de passe'])

@section('content')
<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        
        <!-- Logo -->
        <div class="text-center mb-6">
            <img src="{{ asset('images/logo/site_logo.png') }}"
                 alt="AppSchool"
                 class="w-32 mx-auto mb-4">
            <h1 class="text-xl font-bold text-blue-700">
                Réinitialisation du mot de passe
            </h1>
            <p class="text-gray-600 text-sm mt-2">
                Choisissez un nouveau mot de passe sécurisé pour votre compte.
            </p>
        </div>

        <!-- Formulaire -->
        <form method="POST" action="{{ route('password.update') }}">
            @csrf

            <!-- Token caché -->
            <input type="hidden" name="token" value="{{ $token }}">

            <!-- Email -->
            <div class="mb-4">
                <label for="email" class="block text-gray-600 text-sm mb-1">
                    Adresse email
                </label>
                <input type="email"
                       id="email"
                       name="email"
                       value="{{ old('email', request('email')) }}"
                       required
                       class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">

                @error('email')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Nouveau mot de passe -->
            <div class="mb-4">
                <label for="password" class="block text-gray-600 text-sm mb-1">
                    Nouveau mot de passe
                </label>
                <input type="password"
                       id="password"
                       name="password"
                       required
                       class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">

                @error('password')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Confirmation -->
            <div class="mb-6">
                <label for="password_confirmation" class="block text-gray-600 text-sm mb-1">
                    Confirmer le mot de passe
                </label>
                <input type="password"
                       id="password_confirmation"
                       name="password_confirmation"
                       required
                       class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>

            <!-- Bouton -->
            <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                Réinitialiser le mot de passe
            </button>
        </form>
    </div>
</div>

@include('admin.layouts.alert')
@endsection
