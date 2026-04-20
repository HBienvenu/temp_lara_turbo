<!DOCTYPE html>
<html lang="fr" class="h-full">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="turbo-progress-bar" content="true">
    <title>{{ isset($title) ? SITE_NAME . ' - ' . $title : 'École ' . SITE_NAME }}</title>
    <link rel="icon" type="image/png" href="/images/logo/site_logo.png">

    <script src="{{ asset('js/admin/dark.js') }}"></script>

    {{-- Style DataTable --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/2.3.4/css/dataTables.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/3.0.2/css/responsive.dataTables.css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{-- Style --}}
    <link rel="stylesheet" href="{{ asset('css/admin/style.css') }}?v=1">
    <link rel="stylesheet" href="{{ asset('css/admin/style.database.css') }}?v=1">
    <link rel="stylesheet" href="{{ asset('css/admin/select2.css') }}?v=1">

    <!-- Animation load moderne -->
    <link rel="stylesheet" href="{{ asset('css/admin/load.css') }}">
    <link rel="stylesheet" href="{{ asset('css/admin/hotwire-transition.css') }}">
</head>

<body
    class="bg-white dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col md:flex-row">

    <div id="loader">
        <div class="loader-spinner"></div>
    </div>

    @include('admin.layouts.sidebar')

    <div class="content-wrapper flex-1 flex flex-col md:ml-0 md:mr-0 md:z-40">

        <turbo-frame id="main_content">
            @include('admin.layouts.header')

            <!-- Main Content -->
            <div class="p-6 flex-1 dark:bg-gray-950 dark:text-gray-100 bg-gray-50">

                <main>
                    @include('admin.layouts.alert')
                    @yield('content')
                    @yield('script')
                </main>
            </div>
        </turbo-frame>

        <!-- Footer (en dehors de load) -->
        @include('admin.layouts.footer')
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="https://cdn.datatables.net/2.3.4/js/dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/3.0.2/js/dataTables.responsive.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="{{ asset('js/admin/script.js') }}"></script>
    <script src="{{ asset('js/admin/datatable_init.js') }}"></script>
    <script src="{{ asset('js/admin/script_component_form.js') }}" defer></script>
    <script src="{{ asset('js/admin/script_component_detail.js') }}"></script>
    <script src="{{ asset('js/admin/script_component_single_form.js') }}"></script>
    <script src="{{ asset('js/admin/select2.js') }}"></script>
    <script src="{{ asset('js/admin/etat_sidebar.js') }}"></script>
    <script src="{{ asset('js/admin/pre_load_turbo.js') }}"></script>
    <script>
     
    </script>
</body>

</html>
