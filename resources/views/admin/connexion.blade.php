@extends('site', ['title' => 'Connexion'])

@section('content')
    <section class="min-h-[80vh] flex items-center justify-center bg-gray-50 pt-22 pb-18">
        <div class="max-w-md w-full bg-white p-10 rounded-xl shadow-lg mx-6">
            <h1 class="text-3xl font-bold text-center mb-8 text-[#D5BE60]">Connexion</h1>

            @if (session('message'))
                <div class="text-red-700 relative mb-4">
                    {{ session('message') }}
                </div>
            @endif

            <form method="POST" action="{{ route('login.post') }}" class="space-y-6">
                @csrf

                <div class="relative">
                    <input id="email" name="email" type="email" required
                        class="peer w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-transparent
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Adresse e-mail" value="{{ old('email') }}" />
                    <label for="email"
                        class="absolute left-4 top-3 text-gray-500 text-sm transition-all
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-[-0.6rem] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1">
                        Adresse e-mail
                    </label>
                    @error('email')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="relative">
                    <input id="password" name="password" type="password" required
                        class="peer w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-transparent
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Mot de passe" />
                    <label for="password"
                        class="absolute left-4 top-3 text-gray-500 text-sm transition-all
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-[-0.6rem] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1">
                        Mot de passe
                    </label>
                    @error('password')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center space-x-2 text-gray-600 text-sm">
                        <input type="checkbox" name="remember" class="rounded border-gray-300 focus:ring-blue-500" />
                        <span>Se souvenir de moi</span>
                    </label>

                    <a href="{{ route('password.forgot') }}" class="text-blue-600 hover:underline text-sm">
                        Mot de passe oublié ?
                    </a>
                </div>

                <button type="submit"
                    class="w-full bg-[#003DA5] text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-800 transition">
                    Se connecter
                </button>
            </form>
        </div>
    </section>
    @include('admin.layouts.alert')
@endsection

@section('script')
    <script>
        $(document).ready(function() {
            // Fonction qui met à jour l'état d'un input
            function updateInputState(input) {
                if ($(input).val().trim() !== '') {
                    $(input).addClass('not-empty');
                } else {
                    $(input).removeClass('not-empty');
                }
            }

            // Initialiser à l'ouverture de la page
            $('input').each(function() {
                updateInputState(this);
            });

            // Sur saisie
            $('input').on('input', function() {
                updateInputState(this);
            });
        });
    </script>
@endsection
