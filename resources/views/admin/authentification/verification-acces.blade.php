@extends('admin.layouts.auth_layout', ['title' => "Initialisation de l'application"])

@section('content')
    @if ($errors->any())
        <div class="w-full max-w-xl mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-left">
            <ul class="list-disc list-inside space-y-1">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    @if ($user->active)
        @if (!doitChangerMotDePasse())
            @if (autreSessionExiste())
                <div class="flex justify-center items-center bg-gray-100 min-h-screen">
                    <div class="bg-white shadow-2xl rounded-2xl w-[400px] p-8 text-center">
                        <img src="{{ asset('images/logo/site_logo.png') }}" alt="Bienvenue sur l'application AppSchool"
                            class="w-40 mx-auto mb-4">

                        <h1 class="font-bold text-blue-700 mb-2">Vérification d'accès</h1>
                        <p class="text-gray-600 text-md mb-6">
                            Vous avez déjà une connexion active. <br> Voulez-vous déconnecter l'ancienne ?
                        </p>

                        <div class="flex justify-between gap-4">
                            {{-- Bouton NON --}}
                            <form method="POST" action="{{ route('logout') }}" class="flex-1">
                                @csrf
                                <button type="submit"
                                    class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-200">
                                    Non
                                </button>
                            </form>

                            {{-- Bouton OUI --}}
                            <form method="POST" action="{{ route('connection.multiple') }}" class="flex-1">
                                @csrf
                                <button type="submit"
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                                    Oui
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            @else
                @if (utilisateurAdministratif())
                    @if (plusieursSitesAssocies())
                        @if (!empty(session('site_id')))
                            <script>
                                window.location.href = "{{ route('dashboard') }}";
                            </script>
                        @endif
                        <div class="flex justify-center items-center bg-gray-100 min-h-screen">
                            <div class="bg-white shadow-2xl rounded-2xl w-[400px] p-8 text-center">
                                <img src="{{ asset('images/logo/site_logo.png') }}"
                                    alt="Bienvenue sur l'application AppSchool" class="w-40 mx-auto mb-4">

                                <h1 class="font-bold text-blue-700 mb-2">Vérification d'accès</h1>

                                <p class="text-gray-600 text-md mb-6">
                                    Veuillez en choisir un site pour continuer.
                                </p>

                                <form action="{{ route('do.choix.site.connexion') }}" method="POST" class="text-left">
                                    @csrf

                                    <label for="site" class="block mb-2 text-sm font-medium text-center text-gray-700">
                                        Sélectionnez un site
                                    </label>
                                    @php $sitesUtilisateur = Auth::user()->sites @endphp
                                    <select name="site_id" id="site"
                                        class="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-blue-500 focus:border-blue-500">
                                        @foreach ($sitesUtilisateur as $site)
                                            <option value="{{ $site->site->id }}">
                                                {{ $site->site->name }}
                                            </option>
                                        @endforeach
                                    </select>

                                    <button type="submit"
                                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                                        Choisir le site
                                    </button>
                                </form>
                            </div>
                        </div>
                    @else
                        @php
                            session(['site_id' => (int)Auth::user()->sites->first()->site->id]);
                        @endphp
                        <script>
                            window.location.href = "{{ route('dashboard') }}";
                        </script>
                    @endif
                @elseif(roleUtilisateurExiste())
                    <script>
                        window.location.href = "{{ route('dashboard') }}";
                    </script>
                @else
                    <div class="flex justify-center items-center bg-gray-100 min-h-screen">
                        <div class="bg-white shadow-2xl rounded-2xl w-[400px] p-8 text-center">
                            <img src="{{ asset('images/logo/site_logo.png') }}" alt="Bienvenue sur l'application AppSchool"
                                class="w-40 mx-auto mb-4">

                            <h1 class="font-bold text-blue-700 mb-2">Vérification d'accès</h1>
                            <p class="text-gray-600 text-md mb-6">
                                Vous n'avez pas de rôle attribué. <br> Merci de contacter l'administrateur.
                            </p>

                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit"
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                                    Revenir en arrière
                                </button>
                            </form>
                        </div>
                    </div>
                @endif
            @endif
        @else
            <div class="flex justify-center items-center  bg-gray-100">
                <div class="bg-white shadow-2xl rounded-2xl w-[400px] p-8 text-center">
                    <img src="{{ asset('images/logo/site_logo.png') }}" alt="Bienvenue sur l'application AppSchool"
                        class="w-40 mx-auto">
                    <h1 class="font-bold text-blue-700 mb-2">Verification d'accès</h1>
                    <p class="text-gray-600 text-md mb-6">
                        {{ $user->must_change_password
                            ? 'Veuillez changer votre mot de passe pour votre premier accès'
                            : 'Votre mot de passe est resté inchangé depuis plus de ' .
                                config('app.password_expiry_days') .
                                ' jours. Veuillez le modifier !' }}
                    </p>
                    <form id="changePasswordForm" method="POST"
                        action="{{ $user->must_change_password ? route('change.first.password') : route('change.force.password') }}">
                        @csrf

                        <div class="mb-3 relative">
                            <label class="block mb-1 text-gray-600 text-md">Mot de passe actuel</label>
                            <input type="password" id="current_password" name="current_password"
                                class="w-full border border-gray-300 p-2 rounded pr-10" required>

                            <button type="button" onclick="togglePassword('current_password', this)"
                                class="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                                👁️
                            </button>
                        </div>

                        <div class="mb-3 relative">
                            <label class="block mb-1 text-gray-600 text-md">Nouveau mot de passe</label>
                            <input type="password" id="new_password" name="new_password"
                                class="w-full border p-2 border-gray-300 rounded pr-10" required>

                            <button type="button" onclick="togglePassword('new_password', this)"
                                class="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                                👁️
                            </button>
                        </div>

                        <div class="mb-3 relative">
                            <label class="block mb-1 text-gray-600 text-md">Confirmer le mot de passe</label>
                            <input type="password" id="new_password_confirmation" name="new_password_confirmation"
                                class="w-full border border-gray-300 p-2 rounded pr-10" required>

                            <button type="button" onclick="togglePassword('new_password_confirmation', this)"
                                class="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                                👁️
                            </button>

                            <p id="passwordError" class="text-red-500 text-sm mt-1 hidden">Les mots de passe ne
                                correspondent pas.</p>
                        </div>

                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Mettre à jour le mot de
                            passe</button>
                    </form>
                </div>
            </div>
        @endif
    @else
        <div class="flex justify-center items-center  bg-gray-100">
            <div class="bg-white shadow-2xl rounded-2xl w-[400px] p-8 text-center">
                <img src="{{ asset('images/logo/site_logo.png') }}" alt="Bienvenue sur l'application AppSchool"
                    class="w-40 mx-auto">
                <h1 class="font-bold text-blue-700 mb-2">Verification d'accès</h1>
                <p class="text-gray-600 text-md mb-6">Votre compte n'est pas actif.<br> Merci de contacter l'administrateur.
                </p>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Revenir en arrière
                    </button>
                </form>
            </div>
        </div>
    @endif
@endsection

@section('script')
    <script>
        // Validation correspondance mot de passe
        const form = document.getElementById('changePasswordForm');
        const newPassword = document.getElementById('new_password');
        const confirmPassword = document.getElementById('new_password_confirmation');
        const error = document.getElementById('passwordError');

        form.addEventListener('submit', function(e) {
            if (newPassword.value !== confirmPassword.value) {
                e.preventDefault();
                error.classList.remove('hidden');
                confirmPassword.classList.add('border-red-500');
            } else {
                error.classList.add('hidden');
                confirmPassword.classList.remove('border-red-500');
            }
        });

        function togglePassword(inputId, button) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = '🙈';
            } else {
                input.type = 'password';
                button.textContent = '👁️';
            }
        }
    </script>
@endsection
