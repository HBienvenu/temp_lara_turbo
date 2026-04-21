@extends('admin.layouts.auth_layout', ['title' => 'Vérification Compte'])

@section('content')
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-2xl rounded-2xl w-[400px] p-8 text-center">
            <img src="{{ asset('images/logo/site_logo.png') }}" alt="Bienvenue sur l'application AppSchool"
                class="w-40 mx-auto mb-6">

            <h1 class="font-bold text-blue-700 mb-4 text-xl">Vérification d'accès</h1>

            <p class="text-gray-600 text-md mb-6">
                Veuillez saisir le code que vous avez reçu par email
            </p>

            <form action="{{ route('do.verification.connection.multiple') }}" method="POST">
                @csrf

                @if (session('status') || session('noVerify'))
                    <h4 class="text-center {{ session('status') ? 'text-blue-600' : 'text-red-600' }} mb-4">
                        {{ session('status') ?? session('noVerify') }}
                    </h4>
                @endif

                <!-- Input code -->
                <div class="mb-4">
                    <input type="text" name="code" value="{{ old('code') }}" required
                        placeholder="Entrer le code ici"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    <input type="hidden" name="verification_token" value="{{ $token }}">
                </div>

                <!-- Bouton -->
                <div class="mt-3">
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200">
                        Vérifier
                    </button>
                </div>
            </form>
        </div>
    </div>

    @include('admin.layouts.alert')
@endsection
