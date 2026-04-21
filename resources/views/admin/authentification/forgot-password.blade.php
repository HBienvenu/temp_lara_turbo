@extends('admin.layouts.auth_layout', ['title' => 'Réinitialisation du mot de passe'])

@section('content')
    <div class="flex justify-center items-center px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div class="bg-white dark:bg-gray-900 shadow-2xl rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-md lg:max-w-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-800">
            
            <!-- Logo -->
            <div class="text-center mb-4 sm:mb-5 lg:mb-6">
                <img src="{{ asset('images/logo/site_logo.png') }}" 
                     alt="Logo AppSchool" 
                     class="w-20 sm:w-24 lg:w-28 h-auto mx-auto mb-1 sm:mb-3 lg:mb-4">
                
                <!-- Icône de sécurité -->
                <div class="inline-flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14 lg:w-14 lg:h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2 sm:mb-2 lg:mb-2">
                    <svg class="w-2 h-2 sm:w-7 sm:h-7 lg:w-7 lg:h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                        </path>
                    </svg>
                </div>
                
                <h1 class="text-md sm:text-2xl lg:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                    Mot de passe oublié ?
                </h1>
                <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-sm leading-relaxed px-2 sm:px-0">
                    Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
            </div>

            <!-- Formulaire -->
            <form method="POST" action="{{ route('send.email.password.forgot') }}" class="space-y-4 sm:space-y-5">
                @csrf
                
                <!-- Champ Email -->
                <div>
                    <label for="email" class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                        Adresse e-mail
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                </path>
                            </svg>
                        </div>
                        <input type="email" 
                               id="email" 
                               name="email"
                               value="{{ old('email') }}"
                               placeholder="votre@email.com"
                               class="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-colors"
                               required >
                    </div>
                    @error('email')
                        <p class="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="break-words">{{ $message }}</span>
                        </p>
                    @enderror
                </div>

                <!-- Bouton de soumission -->
                <button type="submit" 
                        class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 text-white font-semibold py-2.5 sm:py-2 px-4 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 flex items-center justify-center group touch-manipulation">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                    <span class="truncate">Envoyer le lien</span>
                </button>

                <!-- Divider -->
                <div class="relative my-2 sm:my-4">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div class="relative flex justify-center text-xs sm:text-sm">
                        <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">ou</span>
                    </div>
                </div>

                <!-- Retour à la connexion -->
                <a href="{{ route('login') }}" 
                   class="w-full inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 font-medium transition-colors group touch-manipulation">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                        </path>
                    </svg>
                    <span class="truncate">Retour à la connexion</span>
                </a>
            </form>

            <!-- Information supplémentaire -->
            <div class="mt-4 sm:mt-6 p-2.5 sm:p-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div class="flex">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    <p class="text-[10px] sm:text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                        Si vous ne recevez pas l'e-mail dans les 5 minutes, vérifiez votre dossier spam ou contactez l'assistance.
                    </p>
                </div>
            </div>
        </div>
    </div>

    @include('admin.layouts.alert')
@endsection